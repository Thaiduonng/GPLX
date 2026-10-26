$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
node "$scriptDir\archify.mjs" @args
