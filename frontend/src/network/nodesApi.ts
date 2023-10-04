// import { ConflictError, UnauthorizedError } from "../errorsForntend/http_errors";
// import { MainPageReturnType, NodeType, User } from "../models/node";

// export async function fetchData(
//   input: RequestInfo,
//   init?: RequestInit | undefined
// ) {
//   const response = await fetch(input, init);
//   if (response.ok) {
//     return response;
//   } else {
//     const errroBody = await response.json();
//     const errorMessage = errroBody.error;
//     if(response.status === 401){
//       throw new UnauthorizedError(errorMessage)
//     }else if(response.status === 409){
//       throw new ConflictError(errorMessage)
//     }else{
//       throw Error(`Request failed with status :  ${response.status} , message: ==${errorMessage}`);

//     }

//   }
// }

// export async function getLoggedInUser(): Promise<User> {
//   const response = await fetchData(
//     `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/authorisedUser`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   // console.log(response.json())
//   return response.json();
// }

// export interface SignUpBody {
//   username: string;
//   email: string;
//   password: string;
// }
// export async function signupFunctionFrontend(
//   credentials: SignUpBody
// ): Promise<User> {
//   const response = await fetchData(
//     `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/signup`,

//     {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     }
//   );
//   return response.json();
// }

// export interface LoginBody {
//   username: string;
//   password: string;
// }

// export async function loginUserInFrontend(
//   credentials: LoginBody
// ): Promise<User> {
//   const response = await fetchData(
//     `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/login`,

//     {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // mode:"no-cors",

//       // ,
//       body: JSON.stringify(credentials),
//     }
//   );

//   return response.json();
// }

// export async function logoutUserInFrontend() {
//   const response = await fetchData(
//     `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/logout`,

//     { method: "POST", credentials: "include" }
//   );
// }

// export async function fetchNodes(pageNumber:number): Promise<MainPageReturnType> {
//   const response = await fetchData(`https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/${pageNumber}`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
     
//   });
//   const data:MainPageReturnType = await response.json();
//   return data;
// }

// export interface RoleInput {
//   title: string;
//   text?: string;
// }
// export async function createNote(note: RoleInput): Promise<NodeType> {
//   const response = await fetchData("https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes", {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(note),
//   });

//   return response.json();
// }

// export async function deleteNode(noteId: string): Promise<void> {
//   await fetchData("https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/" + noteId, {
//     method: "DELETE", credentials: "include",
//   });
// }

// export async function updateNode(
//   noteId: string,
//   note: RoleInput
// ): Promise<NodeType> {
//   const response = await fetchData(
//     "https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/" + noteId,
//     {
//       method: "PATCH",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(note),
//     }
//   );

//   return response.json();
// }


import { ConflictError, UnauthorizedError } from "../errorsForntend/http_errors";
import { MainPageReturnType, NodeType, User } from "../models/node";

export async function fetchData(
  input: RequestInfo,
  init?: RequestInit | undefined
) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errroBody = await response.json();
    const errorMessage = errroBody.error;
    if(response.status === 401){
      throw new UnauthorizedError(errorMessage)
    }else if(response.status === 409){
      throw new ConflictError(errorMessage)
    }else{
      throw Error(`Request failed with status :  ${response.status} , message: ==${errorMessage}`);

    }

  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(
    `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/authorisedUser`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response.json())
  return response.json();
}

export interface SignUpBody {
  username: string;
  email: string;
  password: string;
}
export async function signupFunctionFrontend(
  credentials: SignUpBody
): Promise<User> {
  const response = await fetchData(
    `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/signup`,

    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export interface LoginBody {
  username: string;
  password: string;
}

export async function loginUserInFrontend(
  credentials: LoginBody
): Promise<User> {
  const response = await fetchData(
    `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/login`,

    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // mode:"no-cors",

      // ,
      body: JSON.stringify(credentials),
    }
  );

  return response.json();
}

export async function logoutUserInFrontend() {
  const response = await fetchData(
    `https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/users/logout`,

    { method: "POST", credentials: "include" }
  );
}

export async function fetchNodes(pageNumber:number): Promise<MainPageReturnType> {
  const response = await fetchData(`https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/${pageNumber}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
     
  });
  const data:MainPageReturnType = await response.json();
  return data;
}

export interface RoleInput {
  title: string;
  text?: string;
}
export async function createNote(note: RoleInput): Promise<NodeType> {
  const response = await fetchData("https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
}

export async function deleteNode(noteId: string): Promise<void> {
  await fetchData("https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/" + noteId, {
    method: "DELETE", credentials: "include",
  });
}

export async function updateNode(
  noteId: string,
  note: RoleInput
): Promise<NodeType> {
  const response = await fetchData(
    "https://tsgermantodo-2b7f620d18aa.herokuapp.com/api/routes/" + noteId,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}
