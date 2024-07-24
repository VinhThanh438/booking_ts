# Cheking input parameters to define which entrypoint will be called
case "$1" in
  start)
    echo "API is running..."
    npm start
    ;;
  start-worker)
    echo "Worker is running..."
    npm start:worker
    ;;
  *)
    echo "Usage: $0 {start|start:worker}"
    exit 1
    ;;
esac
