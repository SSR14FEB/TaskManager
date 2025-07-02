const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const isPasswordValid=(password)=>{
    return /^.{8,}$/.test(password);
}

const isNameValid =(name)=>{
    return /^[A-Za-z]+$/.test(name);
}

const isAdminTokenValid =(administrativeToken)=>{
    return /^\d{8,}$/.test(administrativeToken.trim(" "));
}

export{
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isAdminTokenValid
}
  