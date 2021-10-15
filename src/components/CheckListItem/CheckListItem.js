import { Card, CardContent, Checkbox, FormControlLabel } from '@material-ui/core'
import { useState } from 'react'

function CheckListItem({ id, name }) {
    const [checked, setChecked] = useState()
    return (
        <Card onClick={() => setChecked(!checked)}>
            <CardContent>
                <FormControlLabel
                    value={id}
                    control={<Checkbox color="primary" />}
                    label={name}
                    labelPlacement="start"
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    name="role"
                />
            </CardContent>
        </Card>
    )
}

export default CheckListItem
