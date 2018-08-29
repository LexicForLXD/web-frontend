import client from "../client";

export default {
  fetch() {
    return client
      .withAuth()
      .get(
        "/corsproxy?url=https://uk.images.linuxcontainers.org/1.0/images/aliases"
      );
  }
};
