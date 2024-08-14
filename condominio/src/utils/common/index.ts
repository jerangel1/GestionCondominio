export const iconList = (): any => {
    const obj: any = {};
    // Object.keys(icons).forEach((key) => {
    //   if (typeof icons==='object' && obj) {
    //     obj[
    //       key
    //         ?.replace(/Icon$/g, "")
    //         ?.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g)
    //         ?.join("-")
    //         ?.toLocaleLowerCase() || ''
    //     ] = typeof icons==='object' && icons;
    //   }
    // });
    return obj;
  };
  
  export const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  };