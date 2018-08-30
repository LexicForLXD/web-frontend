import client from "../client";

export default {
  fetch() {
    return client.withAuth().get("/backups");
  },
  delete(backupId) {
    return client.withAuth().delete("/backups/" + backupId);
  },
  show(backupId) {
    return client.withAuth().get("/backups/" + backupId);
  },
  create(backup) {
    return client.withAuth().post("/backups", backup);
  }
};
