export interface IFileProps  {
  id: number;
  name: string;
  type: string;
  deleteHandler: (id: number) => void;
}
