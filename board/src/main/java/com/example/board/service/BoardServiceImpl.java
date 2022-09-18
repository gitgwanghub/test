package com.example.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.board.dto.BoardDto;
import com.example.board.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired
	BoardMapper mapper;

	@Override
	public List<BoardDto> getList(BoardDto dto) {
		nullCheck(dto);
		return mapper.getList(dto);
	}

	@Override
	public int getTotal(BoardDto dto) {
		nullCheck(dto);
		return mapper.getTotal(dto);
	}

	@Override
	public void insert(BoardDto dto) {
		mapper.insert(dto);
	}

	@Override
	public void update(BoardDto dto) {
		mapper.update(dto);
	}

	@Override
	public void delete(List<Integer> idList) {
		mapper.delete(idList);
	}

	@Override
	public BoardDto getBoard(int id) {
		return mapper.getBoard(id);
	}

	static BoardDto nullCheck(BoardDto dto) {
		
		if (dto.getContents() == null) {
			dto.setContents("");
		}
		if (dto.getTitle() == null) {
			dto.setTitle("");
		}
		if (dto.getWriter() == null) {
			dto.setWriter("");
		}
		return dto;
	}

	@Override
	public void viewCnt(BoardDto dto) {
		mapper.viewCnt(dto);
	}
}
