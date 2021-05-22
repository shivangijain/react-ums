import React from 'react';
import { connect }    from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import { useStore } from 'react-redux';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import Input from "@material-ui/core/Input";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { setPage, setRowsPerPage, toggleEditMode } from '../actions';
const columns = [
  { id: 'first_name', label: 'First Name' },
  {
    id: 'last_name',
    label: 'Last Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'dob',
    label: 'DOB'
  }
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 650
  },
  input: {
    width: 130,
    height: 40
  }
});

const renderSwitch = (name, onChange, classes, editableUser) => {
  switch(name){
    case 'email':
    case 'last_name':
    case 'first_name':
      return <Input
        value={editableUser[name]}
        name={name}
        onChange={e => onChange(e, editableUser)}
        className={classes.input}
      />
    case 'status':
      return <FormControlLabel
        control={
          <Checkbox
            checked={editableUser[name] === 'Active' || false}
            onChange={e => onChange(e, editableUser)}
            name={name}
            color="primary"
          />
        }
        label="Active"
      />
    case 'dob':
      return  <Input
      type='date'
      value={editableUser[name]}
      name={name}
      onChange={e => onChange(e, editableUser)}
      className={classes.input}
    />
    default:
      return null;
  }
}

const CustomTableCell = ({ user, name, onChange, editableUser }) => {
  const classes = useStyles();
  const { isEditMode } = user;
  return (
    <TableCell align="left" >
      {isEditMode && editableUser ? 
        renderSwitch(name, onChange, classes, editableUser)         
       : (
        user[name] || 'NA'
      )}
    </TableCell>
  );
};

const Landing = (props) => {
  const classes = useStyles();

  const [editableUser, setEditableUser] = React.useState(null);
	const store = useStore().getState();
	const users = store.usersList.users || []

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
    props.setPage(0);
  };

  const onToggleEditMode = (user, type) => {
    type === 'edit' && setEditableUser(user)
    props.toggleEditMode(user);
  }

  const onChange = (e, user) => {
    const name = e.target.name;
    let value = ''
    if(name === 'status'){
      value = e.target.checked ? 'Active' : 'Inactive'
    }else{
      value = e.target.value;
    }
    
    const newUser = {...user, [name]: value}
    setEditableUser(newUser)
  }

  

	const {page, rowsPerPage} = props
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="caption table">
          <TableHead>
						<TableRow>
              {columns.map((column) => (
								<TableCell
									key={column.id}
								>
									{column.label}
								</TableCell>
              ))}
							<TableCell>Action</TableCell>
						</TableRow>
          </TableHead>
          <TableBody>
            {users && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.email}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <CustomTableCell {...{ user, name: column.id, onChange, editableUser }} key={column.id}/>
                    );
                  })}
									<TableCell key='action'>
                    {user.isEditMode ? (
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(editableUser, 'save')}
                      >
                        <DoneIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => onToggleEditMode(user, 'edit')}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
										<Link to={`/user/${user.id}`}>View</Link>

									</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setPage: (page) => dispatch(setPage(page)),
		setRowsPerPage: (rowsPerPage) => dispatch(setRowsPerPage(rowsPerPage)),
    toggleEditMode: (user) => dispatch(toggleEditMode(user))
  }
}

const mapStateToProps = state => {
  return { 
		page: state.usersList.page, 
		rowsPerPage: state.usersList.rowsPerPage	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

