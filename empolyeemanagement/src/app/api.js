const BASE_API = "https://empolyeemanagement-68fv64fbk-manish123his-projects.vercel.app";

export const GetAllEmpolyees = async (search = "", page = 1, limit = 5) => {
  const url = `${BASE_API}/api/empolyes?search=${search}&page=${page}&limit=${limit}`;
  try {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CreateEmpolyees = async (empObj) => {
  const url = `${BASE_API}/api/empolyes`;
  try {
    const formData = new FormData();

    for (const key in empObj) {
      formData.append(key, empObj[key]);
    }
    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: formData,
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateEmpolyees = async (empObj, id) => {
  const url = `${BASE_API}/api/empolyes/${id}`;
  console.log("url ", url);

  const formData = new FormData();

  for (const key in empObj) {
    formData.append(key, empObj[key]);
  }

  const options = {
    method: "PUT",
    body: formData,
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    console.log("<---update--> ", data);
    return data;
  } catch (err) {
    return err;
  }
};

export const DeleteEmpolyees = async (id) => {
  const url = `${BASE_API}/api/empolyes/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

export const GetEmployeeDetailsById = async (id) => {
  const url = `${BASE_API}/api/empolyes/${id}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};
