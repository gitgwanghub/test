package com.example.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.board.dto.BoardDto;

@Mapper
public interface BoardMapper {
	public List<BoardDto> getList(BoardDto dto);
	public int getTotal(BoardDto dto);
	public void insert(BoardDto dto);
	public void update(BoardDto dto);
	public void delete(List<Integer> idList);
	public BoardDto getBoard(int idddddd);
	public void viewCnt(BoardDto dto);
}
