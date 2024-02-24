export abstract class BasePage<T> {
  protected readonly props: T;
  constructor(props: T) {
    this.props = props;
  }

  abstract render(): void;
}
