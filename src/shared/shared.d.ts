interface MenuItemProps {
    id: string;
    href: string;
    text: string;
}

interface AppProps {
    listItems: string[];
    menuItems: MenuItemProps[];
}

interface AppContext {
    initialState: AppProps
}