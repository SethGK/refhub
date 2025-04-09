# Start from the official Go image for building the app
FROM golang:1.22 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download Go modules
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go app
RUN go build -o refhub main.go

# Create a minimal runtime image
FROM debian:bookworm-slim

# Set working directory
WORKDIR /app

# Copy the binary from the builder
COPY --from=builder /app/refhub .

# Copy any needed static assets or files
# COPY --from=builder /app/templates ./templates  # uncomment if you add templates

# Set environment variable to use port 8080
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Run the binary
CMD ["./refhub"]
