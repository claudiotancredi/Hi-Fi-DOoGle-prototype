
function cssForHashLoader() {
    const override = `
    margin       : 0;
    position     : absolute;
    top          : 50%;
    left         : 50%;
    -ms-transform: translate(-50%, -50%);
    transform    : translate(-50%, -50%);
  `;
    return override;
}

function cssForHashLoader2() {
    const override = `
    margin       : 0;
    position     : absolute;
    top          : 44%;
    left         : 50%;
    -ms-transform: translate(-50%, -50%);
    transform    : translate(-50%, -50%);
  `;
    return override;
}

const hashColor = "#ff780a";
const hashLoaderSize = 150;

const UTILS = { cssForHashLoader, cssForHashLoader2, hashColor, hashLoaderSize};
export default UTILS;