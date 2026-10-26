package vn.edu.gplx.modules.learning.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.ExamConfigurationDto;
import vn.edu.gplx.modules.learning.application.ExamConfigService;
import vn.edu.gplx.modules.learning.domain.ExamConfiguration;
import vn.edu.gplx.modules.learning.infrastructure.ExamConfigurationRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.List;

@Service
@Transactional
public class ExamConfigServiceImpl implements ExamConfigService {

    private final ExamConfigurationRepository configRepository;

    public ExamConfigServiceImpl(ExamConfigurationRepository configRepository) {
        this.configRepository = configRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExamConfigurationDto> getActiveConfigurations() {
        return configRepository.findAllByActiveTrue().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExamConfigurationDto getConfigByCategory(String categoryCode) {
        ExamConfiguration config = configRepository.findByCategoryCodeAndActiveTrue(categoryCode.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("ExamConfiguration", "categoryCode", categoryCode));
        return toDto(config);
    }

    @Override
    public ExamConfigurationDto updateConfig(Long id, ExamConfigurationDto dto) {
        ExamConfiguration config = configRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExamConfiguration", "id", id));

        config.setTotalQuestions(dto.totalQuestions());
        config.setDurationMinutes(dto.durationMinutes());
        config.setPassingScore(dto.passingScore());
        config.setActive(dto.active());
        if (dto.rulesVersion() != null) {
            config.setRulesVersion(dto.rulesVersion());
        }
        if (dto.legalSource() != null) {
            config.setLegalSource(dto.legalSource());
        }

        config = configRepository.save(config);
        return toDto(config);
    }

    private ExamConfigurationDto toDto(ExamConfiguration c) {
        return new ExamConfigurationDto(
                c.getId(),
                c.getCategoryCode(),
                c.getTotalQuestions(),
                c.getDurationMinutes(),
                c.getPassingScore(),
                c.getRulesVersion(),
                c.isActive(),
                c.getLegalSource()
        );
    }
}
