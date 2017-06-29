package com.creat.lib.service;

import com.creat.lib.po.StackCustom;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/28 0028.
 */
public interface StackService {
    List<StackCustom> selectAllStacks() throws Exception;
    void addStack(String stack) throws Exception;
    void deleteStack(Integer sId) throws Exception;
}
