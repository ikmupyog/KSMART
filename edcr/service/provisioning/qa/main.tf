resource "aws_ecr_repository" "ecr_repo" {
  name = "${var.ecr_repository_name}-qa"

  tags = merge(var.default_tags, {
    Name = "${var.ecr_repository_name}-qa"
  })
}

resource "aws_ecr_lifecycle_policy" "purge_policy" {
  repository = aws_ecr_repository.ecr_repo.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 30 images"
        selection    = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 30
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_iam_role" "ecr_role" {
  name = "ksm-edcr-ecr-role-qa"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com",
        },
      },
    ],
  })
}

resource "aws_iam_policy" "ecr_policy" {
  name        = "ksm-edcr-policy-qa"
  description = "Policy for ECR access"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:DescribeImages",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage",
        ],
        Effect   = "Allow",
        Resource = aws_ecr_repository.ecr_repo.arn,
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "ecr_role_attachment" {
  role       = aws_iam_role.ecr_role.name
  policy_arn = aws_iam_policy.ecr_policy.arn
}

resource "aws_iam_instance_profile" "example_profile" {
  name = "example_profile-qa"
  role = aws_iam_role.ecr_role.name
}

resource "aws_security_group" "ec2_sg" {
  name        = "ksm-edcr-sg-qa"
  description = "Allow all traffic"
  vpc_id      = var.vpc_id 
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ec2_instance" {
  ami                    = "ami-0287a05f0ef0e9d9a"
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  subnet_id              = var.subnet_id
  associate_public_ip_address = true
  user_data              = <<-EOF
                            #!/bin/bash
                            apt-get update -y
                            apt-get install -y docker.io
                            usermod -aG docker ubuntu
                            EOF
  
  iam_instance_profile = aws_iam_instance_profile.example_profile.name
  
  # root disk
  root_block_device  {
    volume_size           = "250"
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = merge(var.default_tags, {
    Name = "ksm-edcr-qa"
  })
}

