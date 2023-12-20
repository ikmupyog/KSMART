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
    Environment = "qa"
    Project     = "ksmart"
    Subproject  = "edcr"
  }
}

variable "vpc_id" {
  default = "vpc-0c7c860a950f2dbac"
}

variable "subnet_id" {
  default = "subnet-0b6cb79284c46c67c"  
}

variable "instance_type" {
  default = "t3a.2xlarge"
}

variable "security_group_id" {
  default = "sg-0bce2a4eb90283228"
}

variable "ecr_repository_name" {
  default = "ksm-edcr"
}
