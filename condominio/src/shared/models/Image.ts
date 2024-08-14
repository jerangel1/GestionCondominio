export type Image = {
  path  :  string,
  lastModified: string,
  lastModifiedDate: Date,
  name: string,
  size: string,
  type: string,
  webkitRelativePath:string
}

export type AcceptedFiles ={
  acceptedFiles: Array<File>
}