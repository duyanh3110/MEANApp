
export class Blog {
  _id?: string;
  name: string;
  token: string;
  doc: {
    author: string;
    content: string;
  };
}
