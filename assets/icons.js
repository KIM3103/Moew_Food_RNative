import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    cart: (props)=> <Feather name="shopping-cart" size={26} {...props} />,
    favorite: (props)=> <AntDesign name="heart" size={26} {...props} />,
    bill: (props)=> <AntDesign name="barcode" size={26} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} {...props} />,
}