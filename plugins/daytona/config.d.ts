export interface Config {
    /**
     * Configuration options for the Daytona plugin
     */
    daytona?: {
      /**
       * The domain url used for the Daytona installation.
       * @visibility frontend
       */
      domain: string;
    };
  }