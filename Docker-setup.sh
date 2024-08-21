#!/bin/bash

echo "Welcome to the Dockerfile Generator!"
echo "I'll guide you through creating a Dockerfile for your project step by step."

# Automatically detect the root directory
ROOT_DIR=$(pwd)

# Function to ask questions with a default value
ask_question() {
  local prompt="$1"
  local default_value="$2"
  local user_input

  while true; do
    read -p "$prompt [$default_value]: " user_input
    user_input="${user_input:-$default_value}"
    
    if [ -z "$user_input" ]; then
      echo "This field cannot be empty. Please provide a value."
    else
      break
    fi
  done

  echo "$user_input"
}

# Function to validate file existence
validate_file() {
  local file_path="$1"
  
  while true; do
    if [ -f "$file_path" ]; then
      break
    else
      echo "File not found: $file_path. Please enter a valid file path."
      file_path=$(ask_question "Enter the correct file path" "")
    fi
  done

  echo "$file_path"
}

# Step 1: Choose a base image based on programming language
echo "Step 1: Choose the base image according to your project's programming language."
language=$(ask_question "What programming language is your project written in?" "typescript")

case "$language" in
  python)
    base_image=$(ask_question "Choose a base image for Python" "python:3.9-slim")
    requirements="$ROOT_DIR/requirements.txt"
    ;;
  node)
    base_image=$(ask_question "Choose a base image for Node.js" "node:16-alpine")
    package_json="$ROOT_DIR/package.json"
    ;;
  typescript)
    base_image=$(ask_question "Choose a base image for TypeScript" "node:16-alpine")
    package_json="$ROOT_DIR/package.json"
    ;;
  react)
    base_image=$(ask_question "Choose a base image for React" "node:16-alpine")
    package_json="$ROOT_DIR/package.json"
    ;;
  java)
    base_image=$(ask_question "Choose a base image for Java" "openjdk:11-jre-slim")
    ;;
  rust)
    base_image=$(ask_question "Choose a base image for Rust" "rust:1.56")
    cargo_toml="$ROOT_DIR/Cargo.toml"
    ;;
  go)
    base_image=$(ask_question "Choose a base image for Go" "golang:1.16-alpine")
    ;;
  *)
    base_image=$(ask_question "Specify a base image for your language" "ubuntu:20.04")
    ;;
esac

# Step 2: Set maintainer information
echo "Step 2: Provide maintainer information."
maintainer=$(ask_question "Who is the maintainer?" "Your Name <your.email@example.com>")

# Step 3: Set the working directory
echo "Step 3: Set the working directory inside the container."
workdir=$(ask_question "What is the working directory?" "/app")

# Step 4: Validate and handle dependencies or build files
echo "Step 4: Handle dependencies or build files."
case "$language" in
  python)
    requirements=$(validate_file "$requirements")
    ;;
  node | typescript | react)
    package_json=$(validate_file "$package_json")
    ;;
  java)
    build_tool=$(ask_question "Which build tool are you using? (maven/gradle)" "maven")
    ;;
  rust)
    cargo_toml=$(validate_file "$cargo_toml")
    ;;
  go)
    main_go="$ROOT_DIR/main.go"
    main_go=$(validate_file "$main_go")
    ;;
  *)
    echo "No specific dependency management for $language."
    ;;
esac

# Step 5: Specify the command to run your application
echo "Step 5: Set the command to run your application."
run_command=$(ask_question "What command should be run to start your application?" "echo 'Hello, World!'")

# Step 6: Expose ports
echo "Step 6: Specify the port your application uses."
expose_port=$(ask_question "What port should be exposed?" "8080")

# Step 7: Additional RUN commands
echo "Step 7: Add any additional RUN commands."
additional_commands=$(ask_question "Do you want to add any additional RUN commands? (comma-separated)" "")

# Generate the Dockerfile
echo "Generating Dockerfile..."
{
  echo "# Generated Dockerfile"
  echo "FROM $base_image"
  echo "LABEL maintainer=\"$maintainer\""
  echo "WORKDIR $workdir"

  case "$language" in
    python)
      echo "COPY $(basename $requirements) $workdir/"
      echo "RUN pip install --no-cache-dir -r $(basename $requirements)"
      ;;
    node | typescript | react)
      echo "COPY $(basename $package_json) $workdir/"
      echo "RUN npm install"
      ;;
    java)
      if [ "$build_tool" == "maven" ]; then
        echo "COPY pom.xml $workdir/"
        echo "RUN mvn clean install"
      else
        echo "COPY build.gradle $workdir/"
        echo "RUN gradle build"
      fi
      ;;
    rust)
      echo "COPY $(basename $cargo_toml) $workdir/"
      echo "RUN cargo build --release"
      ;;
    go)
      echo "COPY $(basename $main_go) $workdir/"
      echo "RUN go build -o main $(basename $main_go)"
      ;;
  esac

  echo "COPY . $workdir/"
  echo "EXPOSE $expose_port"

  if [ -n "$additional_commands" ]; then
    IFS=',' read -ra ADDR <<< "$additional_commands"
    for cmd in "${ADDR[@]}"; do
      echo "RUN $cmd"
    done
  fi

  echo "CMD [\"$run_command\"]"
} > Dockerfile

echo "Dockerfile has been generated successfully in $ROOT_DIR!"
