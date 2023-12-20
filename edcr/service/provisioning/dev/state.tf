terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    region         = "ap-south-1"
    bucket         = "terraform-ksm-dev-state"
    key            = "edcr/ksm-pgr-services/terraform.tfstate"
    encrypt        = "true"
    dynamodb_table = "terraform-ksm-dev-lock"
  }
}
