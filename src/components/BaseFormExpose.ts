export default interface BaseFormExpose {
  validate(showMessage?: boolean): Promise<boolean>;
}