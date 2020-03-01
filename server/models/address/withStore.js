import { observer, inject } from "mobx-react";

export default Component => {
  return inject("stores")(observer(Component));
};
