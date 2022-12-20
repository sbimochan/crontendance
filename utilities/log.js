export function log(type, message){
  const date = new Date();
  console[type](`${type} [${date}]: ${message}`)
}
