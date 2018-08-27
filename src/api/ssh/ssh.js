import client from "../client";

export default {
  /**
   * Get the public key as string
   */
  publicKey() {
    return client.withAuth().get("/ssh/pub");
  }
};
