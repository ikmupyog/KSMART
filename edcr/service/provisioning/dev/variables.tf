variable "region" {
 description = "AWS region for hosting our your network"
 default = "ap-south-1"
}

variable "key_name" {
 description = "Key name for SSHing into EC2"
 default = "ssh-key"
}

variable "default_tags" {
  default = {
    Environment = "dev"
    Project     = "ksmart"
    Subproject  = "edcr"
  }
}

variable "vpc_id" {
  default = "vpc-02b88d99c93021a54"
}

variable "subnet_id" {
  default = "subnet-0e6066594d36c79ca"  
}

variable "instance_type" {
  default = "t3a.medium"
}

variable "security_group_id" {
  default = "sg-0786bb1cf315f2e7e"
}

variable "ecr_repository_name" {
  default = "ksm-edcr"
}
