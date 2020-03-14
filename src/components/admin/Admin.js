import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdGroup, MdEmail } from 'react-icons/md'
import { addAdminRole } from '../../actions';
import colors from '../../assets/colors';
import Nav from '../_shared/Nav';
import Container from '../_shared/Container';
import CenteredWrapper from '../_shared/CenteredWrapper';
import Input from '../_basic/Input';
import Button from '../_basic/Button';

const Admin = () => {
	const [admin, setAdmin] = useState('');
	const [opponents, setOpponents] = useState('');

	const activeRatingOccasion = null;

	const onOpponentsChange = ({ target }) => setOpponents(target.value);
	const onAdminChange = ({ target }) => setAdmin(target.value);

	/* @todo: refactor to action */
	const onOpenRating = async opponents => {
		// try {
		// 	const id = 1;
		// 	// Get the last rounds "round-number" and add 1. If first round - use 1 instead of 0.
		// 	const round = ratingOccasions.length
		// 		? ratingOccasions.sort((a, b) => b.round - a.round)[0].round + 1
		// 		: 1;

		// 	const newRatingOccasion = {
		// 		id,
		// 		opponents,
		// 		round,
		// 		active: true,
		// 	};
		// 	await setById('ratingOccasions', id, newRatingOccasion);

		// 	// open rating
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	/* @todo: refactor */
	const onCloseRating = async () => {
		// try {
		// 	// TODO: map
		// 	const ratingOccasions = [ratingOccasions];
		// 	const ratingOccasion = this.getActiveRatingOccasion();
		// 	ratingOccasion.active = false;
		// 	ratingOccasions[ratingOccasions.indexOf(ratingOccasion)] = ratingOccasion;
		// 	await updateById('ratingOccasions', ratingOccasion.id, ratingOccasion);

		// 	// close rating
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	const onAddAdmin = () => addAdminRole(admin);

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="ADMIN" />
			<CenteredWrapper bigger>
				<div>
					{
						activeRatingOccasion ?
							<div>
								<RatingInfo>Aktiv röstning: {activeRatingOccasion.opponents}</RatingInfo>
								<Button
									danger
									onClick={onCloseRating}
									customStyle={btnStyle} >
									<span>Stäng röstning</span>
								</Button>
							</div> :
							<div>
								<Input
									id="opponents"
									placeholder='Motståndare'
									icon={<MdGroup />}
									onChange={onOpponentsChange}
									show
								/>
								<Button
									success
									onClick={onOpenRating}
									customStyle={btnStyle}
									disabled={!opponents} >
									<span>Öppna röstning</span>
								</Button>
							</div>
					}
				</div>
				<Hr />
				<div>
					<Input
						id="adminEmail"
						placeholder='E-post'
						icon={<MdEmail />}
						onChange={onAdminChange}
						show
					/>
					<Button
						onClick={onAddAdmin}
						customStyle={btnStyle}
						disabled={!admin} >
						<span>Gör till admin</span>
					</Button>
				</div>
			</CenteredWrapper>
		</Container>
	)
}

const Hr = styled.div`
    border-bottom: 1px dashed #fff;
    margin: 20px 0px;
    width: 100%;
`;

const RatingInfo = styled.div`
    color: #fff;
    margin-bottom: 20px;
`;

let btnStyle = {
	width: '250px',
}

export default Admin;