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
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage, setRowsPerPage } from '../actions';
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
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const Landing = (props) => {
  const classes = useStyles();

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const store = useStore().getState();
	const users = store.usersList.users || []

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(+event.target.value);
    props.setPage(0);
  };

	const {page, rowsPerPage} = props

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
						<TableRow>
              {columns.map((column) => (
								<TableCell
									key={column.id}
								>
									{column.label}
								</TableCell>
              ))}
							<TableCell/>
						</TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.email}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} >
                        {value}
                      </TableCell>
                    );
                  })}
									<TableCell>
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
		setRowsPerPage: (rowsPerPage) => dispatch(setRowsPerPage(rowsPerPage))
  }
}

const mapStateToProps = state => {
  return { 
		page: state.usersList.page, 
		rowsPerPage: state.usersList.rowsPerPage	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
