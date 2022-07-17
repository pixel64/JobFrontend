export class Process {
  name: string;
  command: string;
  cronString: string;
  status: string;

  constructor(name: string, command: string, cronString: string, status: string) {
    this.name = name;
    this.command = command;
    this.cronString = cronString;
    this.status = status;
  }
}
