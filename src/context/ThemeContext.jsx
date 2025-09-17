import React, { createContext, useContext, useState } from 'react'

const ThemeContextAPI= createContext()

export const ThemeContext=({children})=> {
   const [theme,setTheme]=useState(false)

   const darkThemeCSS={
    backgroundColor:"#111",
    color:"#fff",
    borderColor:"#fff"
   }

   const lightThemeCSS={
    backgroundColor:"#fff",
    color:"#000",
    borderColor:"#000"
   }

  return (
    <ThemeContextAPI.Provider value={{theme,setTheme,darkThemeCSS,lightThemeCSS}}>
        {children}
    </ThemeContextAPI.Provider>
  )
}

export const useTheme=()=>useContext(ThemeContextAPI)