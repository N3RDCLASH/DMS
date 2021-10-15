import { Box, Button } from '@material-ui/core'
import CheckListItem from 'components/CheckListItem/CheckListItem'
import React, { useState } from 'react'

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
}
function CheckBoxForm({ items, submit, initialValues }) {
    const [checkedItems, setCheckedItems] = useState()
    const checkListItems = items?.map(item => {
        if (!initialValues?.find(value => value.name === item.name))
            return <CheckListItem name={item.name} value={item.id} key={item.id} />
        return
    }
    )
    return (
        <form action="">
            <div style={gridStyle}>
                {checkListItems?.filter((item) => item !== undefined).length !== 0 ? checkListItems : <span>No items to add</span>}
            </div>
            <Box component={"div"} margin="10px auto">
                <Button
                    style={{ justifySelf: "flex-end", marginTop: "1em" }}
                    variant="contained"
                    color="primary"
                    onClick={() => submit()} >Save</Button>
            </Box>

        </form>
    )
}


export default CheckBoxForm
