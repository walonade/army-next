import { observer, inject } from "mobx-react";

export default Component => {
  return inject("store")(observer(Component));
};
