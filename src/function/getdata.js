export  async function getData(url, setValue) {
    let request = await fetch(url);
    let response = await request.json();
    setValue(response);
    return response;
  }

  export async function postData(url, obj) {

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let response = await request.json();
    return response;
  }


  export async function patchData(url, obj) {

    const request = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let response = await request.json();
    return response;
  }


  export async function deleteData(url, obj) {

    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let response = await request.json();
    return response;
  }

  export  async function getGame(url, obj) {
    let request = await fetch(url, 
     { method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }); 
    let response = await request.json();
    return response;
  }