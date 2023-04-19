const updateQueueIndex = async (index: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/updateIndex`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          index: index,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 201) {
          resolve(true);
        } else reject(false);
      });
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
};

export default updateQueueIndex;
