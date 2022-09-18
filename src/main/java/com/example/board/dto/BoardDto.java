package com.example.board.dto;

import com.example.board.common.BoardCommon;

import lombok.Data;

@Data
public class BoardDto extends BoardCommon{
	private int id;
	private String title;
	private String contents;
	private String writer;
	private String cdate;
	private String mdate;
	private String stat;
	private int views;
}
