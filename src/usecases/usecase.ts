export interface Usecase<InputDTO, OutputDTOP> {
  execute(input: InputDTO): Promise<OutputDTOP>;
}
