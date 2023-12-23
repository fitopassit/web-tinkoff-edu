import { Grid } from '@mui/material';
import { EditForm } from '../../components/Edit-form.jsx';

export function EditFormPage() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item={true} xs={9}>
        <EditForm />
      </Grid>
    </Grid>
  );
}
