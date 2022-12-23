// Import All From React
import * as React from 'react';

// MUI Utils
import { styled } from '@mui/system';
import TablePaginationUnstyled, { tablePaginationUnstyledClasses as classes } from '@mui/base/TablePaginationUnstyled';
import { capitalize } from '@mui/material/utils';

// Contexts
import { ScoreDetailsContext } from './../context/ScoreDetailsContext';

// Types
import { ScoreDetailsContextType } from '../@types/interfaces';

const Root = styled('div')`
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #ddd;
		text-align: center;
		padding: 8px;
	}

	th {
		background-color: #ddd;
	}
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
	& .${classes.toolbar} {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
		}
	}

	& .${classes.selectLabel} {
		margin: 4px;
	}

	& .${classes.displayedRows} {
		margin: 0;

		@media (min-width: 768px) {
			margin-left: auto;
		}
	}

	& .${classes.spacer} {
		display: none;
	}

	& .${classes.actions} {
		display: flex;
		gap: 0.25rem;
	}
`;

// Table To Show Answers History To User
export default function ScoreDetailsTable(): JSX.Element {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const { answers } = React.useContext(ScoreDetailsContext) as ScoreDetailsContextType;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - answers.length) : 0;

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Root sx={{ maxWidth: '100%', width: 500 }}>
			<table aria-label='custom pagination table'>
				<thead>
					<tr>
						<th>Word</th>
						<th>Your Answer</th>
						<th>Answer State</th>
					</tr>
				</thead>
				<tbody>
					{(rowsPerPage > 0 ? answers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : answers).map((ans) => (
						<tr key={ans.questionWord}>
							<td>{capitalize(ans.questionWord)}</td>
							<td style={{ width: 160 }} align='right'>
								{capitalize(ans.studentAnswer)}
							</td>
							<td style={{ width: 160 }} align='right'>
								{ans.isCorrectChoice ? <span style={{ color: 'green' }}> Right Answer </span> : <span style={{ color: 'red' }}> Wrong Answer </span>}
							</td>
						</tr>
					))}
					{emptyRows > 0 && (
						<tr style={{ height: 41 * emptyRows }}>
							<td colSpan={3} />
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<CustomTablePagination
							rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
							colSpan={3}
							count={answers.length}
							rowsPerPage={rowsPerPage}
							page={page}
							slotProps={{
								select: {
									'aria-label': 'rows per page',
								},
								actions: {
									showFirstButton: true,
									showLastButton: true,
								} as any,
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</tr>
				</tfoot>
			</table>
		</Root>
	);
}
