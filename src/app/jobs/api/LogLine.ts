export class LogLine {
  processName: string;
  exitCode: number;
  log: string;
  startDateTime: string;
  endDateTime: string | null;

  constructor(processName: string, exitCode: number, log: string, startDateTime: string, endDateTime: string) {
    this.processName = processName;
    this.exitCode = exitCode;
    this.log = log;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
  }
}
