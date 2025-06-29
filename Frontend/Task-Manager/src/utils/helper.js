const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const isPasswordValid=(password)=>{
    return /^.{8,}$/.test(password);
}

export{
    isValidEmail,
    isPasswordValid
}
  