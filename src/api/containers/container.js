import client from "../client";

export default {
  fetch() {
    return client.withAuth().get("/containers");
  },
  refreshSingle(id) {
    return client.withAuth().get("/containers/" + id + "?fresh=true");
  },
  show(id) {
    return client.withAuth().get("/containers/" + id);
  },
  refreshAll() {
    return client.withAuth().get("/containers?fresh=true");
  },
  delete(containerId) {
    return client.withAuth().delete("/containers/" + containerId);
  },
  create(hostId, container, type) {
    return client
      .withAuth()
      .post("/hosts/" + hostId + "/containers?type=" + type, container);
  },
  update(containerId, container) {
    return client.withAuth().put("/containers/" + containerId, container);
  }
};
