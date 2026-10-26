package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.ExamConfigurationDto;

import java.util.List;

public interface ExamConfigService {
    List<ExamConfigurationDto> getActiveConfigurations();
    ExamConfigurationDto getConfigByCategory(String categoryCode);
    ExamConfigurationDto updateConfig(Long id, ExamConfigurationDto dto);
}
