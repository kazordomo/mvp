import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import colors from "../../assets/colors";

import * as selectors from "../../data/selectors/matches";

import Nav from "../_shared/Nav";
import Container from "../_shared/Container";
import Wrapper from "../_shared/Wrapper";
import ListRow from "./ListRow";

const ListMatch = () => {
	const matches = useSelector(state => selectors.findAll(state));

	return (
		<Container brColor={colors.spacegrayish()}>
			<Nav title="MATCHER" />
			<Wrapper>
				{matches
					.toList()
					.sortBy(match => -match.round)
					.map((match, i) => (
						<ListRow key={match.id} match={match} index={i} />
					))}
			</Wrapper>
		</Container>
	);
};

export default ListMatch;
