package com.example.board.service;

import java.util.List;

import com.example.board.dto.BoardDto;

public interface BoardService {
	public List<BoardDto> getList(BoardDto dto);
	public int getTotal(BoardDto dto);
	public void insert(BoardDto dto);
	public void update(BoardDto dto);
	public void delete(List<Integer> idList);
	public BoardDto getBoard(int id);
	public void viewCnt(BoardDto dto);
}
