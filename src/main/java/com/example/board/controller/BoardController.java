package com.example.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.board.dto.BoardDto;
import com.example.board.service.BoardService;

@Controller
public class BoardController {
	@Autowired
	BoardService service;

	@GetMapping("/table")
	public String table(Model model) {
		BoardDto dto = new BoardDto();
		dto.setStat("A");
		dto.setPg(1);
		model.addAttribute("boardList", service.getList(dto));
		model.addAttribute("total", service.getTotal(dto));
		return "table";
	}
	
	@GetMapping("/table/create")
	public String create() {
		return "create";
	}
	
	@GetMapping("/table/read/{id}")
	public String read(@PathVariable("id") int id, Model model) {
		model.addAttribute("board", service.getBoard(id));
		return "read";
	}
	
	@PostMapping("/table")
	public @ResponseBody HashMap<String, Object> getList(@RequestBody BoardDto dto){
		HashMap<String, Object> map = new HashMap<>();
		dto.setStat("A");
		map.put("boardList", service.getList(dto));
		map.put("total", service.getTotal(dto));
		return map;
	}
	
	@PostMapping("/table/read")
	public @ResponseBody Map<String, Object> read(@RequestBody BoardDto dto) {
		Map<String, Object> map = new HashMap<>();
		service.viewCnt(dto);
		map.put("board", service.getBoard(dto.getId()));
		return map;
	}
	
	@PostMapping("/table/create/insert")
	public @ResponseBody Map<String, Object> insert(@RequestBody BoardDto dto) {
		Map<String, Object> map = new HashMap<>();
		service.insert(dto);
		map.put("result", "success");
		return map;
	}
	
	@PostMapping("/table/update")
	public @ResponseBody Map<String, Object> update(@RequestBody BoardDto dto){
		Map<String, Object> map = new HashMap<>();
		service.update(dto);
		map.put("board", service.getBoard(dto.getId()));
		return map;
	}
	
	@PostMapping("/table/delete")
	public @ResponseBody Map<String, Object> delete(@RequestParam(value="idList[]") List<Integer> idList){
		Map<String, Object> map = new HashMap<>();
		service.delete(idList);
		map.put("result", "success");
		return map;
	}
	
}
