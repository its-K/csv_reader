package com.excel.excel;

import java.io.IOException;
import java.util.*;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class ApiController {  

    @PostMapping("/upload")
    public List<List<String>> fileupload(@RequestParam("file") MultipartFile file) throws IOException{
        List <List<String>> Csvvalues=csvReader.parseCsv(file);
        return Csvvalues;
    }
}

@Controller
class pageView{
    
    @GetMapping("/")
    public String kk(){
        return "index.html";
    }
}
