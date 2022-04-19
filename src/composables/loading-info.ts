export class LoadingInfo {
  private loadingCount = 0;
  private savingCount = 0;

  hasError = false;

  beginLoading() {
    this.resetHasError();
    this.loadingCount++;
  }
  endLoading() {
    this.loadingCount--;
  }

  beginSaving() {
    this.resetHasError();
    this.savingCount++;
  }
  endSaving() {
    this.savingCount--;
  }

  errorOccured() {
    this.hasError = true;
  }

  isLoading() {
    return this.loadingCount > 0;
  }
  isSaving() {
    return this.loadingCount > 0;
  }
  isWorking() {
    return this.isLoading() || this.isSaving();
  }

  private resetHasError() {
    if (this.hasError && !this.isWorking()) {
      this.hasError = false;
    }
  }
}