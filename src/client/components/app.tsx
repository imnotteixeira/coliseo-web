import React, { useEffect, useState } from 'react';

import Header from './header';
import Button from './button';
import Main from './main';
import Menu from './menu';

const App: React.FC<AppProps> = (props) => {
    
    const [disabled, setDisabled] = useState<boolean>(()=>true)
    
    const [listItems, setListItems] = useState<string[]>(props.listItems)

    useEffect(() => {
        setDisabled(false)
    }, [])

    // Update the state whenever its clicked by adding a new item to
    // the list - imagine this being updated with the results of AJAX calls, etc
    const handleAdd = () => {
        setListItems((listItems) => ([...listItems, 'Item ' + listItems.length]))
    };

    const handleSort = () => {
        setListItems((listItems) => listItems.sort())
    };

    return (
        <div>
            helllo2345678
            <Menu items={props.menuItems} />
            <Main>
                <Header title="Hello React" sub="This is an example using React & TypeScript" />
                <ul>
                    {listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
                <Button
                    onClick={handleAdd}
                    disabled={disabled}
                    type="primary"
                    text="Add Item"
                />
                <span>&nbsp;</span>
                <Button
                    onClick={handleSort}
                    disabled={disabled}
                    type="warning"
                    text="Sort Items"
                />
            </Main>
        </div>
    );
}

export default App;
