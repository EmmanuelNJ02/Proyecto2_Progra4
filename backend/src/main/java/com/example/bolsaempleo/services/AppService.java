package com.example.bolsaempleo.services;

import com.example.bolsaempleo.dtos.form.CaracteristicaForm;
import com.example.bolsaempleo.dtos.form.HabilidadesForm;
import com.example.bolsaempleo.dtos.form.LoginForm;
import com.example.bolsaempleo.dtos.form.PuestoForm;
import com.example.bolsaempleo.dtos.form.RegistroEmpresaForm;
import com.example.bolsaempleo.dtos.form.RegistroOferenteForm;
import com.example.bolsaempleo.dtos.form.RequisitoForm;
import com.example.bolsaempleo.dtos.view.LoginView;
import com.example.bolsaempleo.dtos.view.MensajeView;
import com.example.bolsaempleo.exceptions.ApiException;
import com.example.bolsaempleo.models.Caracteristica;
import com.example.bolsaempleo.models.Empresa;
import com.example.bolsaempleo.models.Estado;
import com.example.bolsaempleo.models.Oferente;
import com.example.bolsaempleo.models.OferenteHabilidad;
import com.example.bolsaempleo.models.OferenteHabilidadId;
import com.example.bolsaempleo.models.Puesto;
import com.example.bolsaempleo.models.PuestoCaracteristica;
import com.example.bolsaempleo.models.PuestoCaracteristicaId;
import com.example.bolsaempleo.models.Rol;
import com.example.bolsaempleo.models.TipoPublicacion;
import com.example.bolsaempleo.models.Usuario;
import com.example.bolsaempleo.repositories.CaracteristicaRepository;
import com.example.bolsaempleo.repositories.EmpresaRepository;
import com.example.bolsaempleo.repositories.OferenteHabilidadRepository;
import com.example.bolsaempleo.repositories.OferenteRepository;
import com.example.bolsaempleo.repositories.PuestoCaracteristicaRepository;
import com.example.bolsaempleo.repositories.PuestoRepository;
import com.example.bolsaempleo.repositories.UsuarioRepository;
import com.example.bolsaempleo.security.JwtService;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AppService {
    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final OferenteRepository oferenteRepository;
    private final CaracteristicaRepository caracteristicaRepository;
    private final PuestoRepository puestoRepository;
    private final PuestoCaracteristicaRepository puestoCaracteristicaRepository;
    private final OferenteHabilidadRepository oferenteHabilidadRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public AppService(UsuarioRepository usuarioRepository, EmpresaRepository empresaRepository,
                      OferenteRepository oferenteRepository, CaracteristicaRepository caracteristicaRepository,
                      PuestoRepository puestoRepository, PuestoCaracteristicaRepository puestoCaracteristicaRepository,
                      OferenteHabilidadRepository oferenteHabilidadRepository, PasswordEncoder passwordEncoder,
                      JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.empresaRepository = empresaRepository;
        this.oferenteRepository = oferenteRepository;
        this.caracteristicaRepository = caracteristicaRepository;
        this.puestoRepository = puestoRepository;
        this.puestoCaracteristicaRepository = puestoCaracteristicaRepository;
        this.oferenteHabilidadRepository = oferenteHabilidadRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginView login(LoginForm form) {
        Usuario usuario = usuarioRepository.findByCorreoElectronico(form.getUsuario())
                .orElseThrow(() -> new ApiException("Usuario o clave incorrectos."));
        boolean claveValida = passwordEncoder.matches(form.getClave(), usuario.getClave()) || form.getClave().equals(usuario.getClave());
        if (!claveValida) {
            throw new ApiException("Usuario o clave incorrectos.");
        }
        if (usuario.getEstado() != Estado.APROBADO) {
            throw new ApiException("El usuario existe, pero aún no ha sido aprobado por administración.");
        }
        return new LoginView(jwtService.generateToken(usuario), usuario.getRol().name(), usuario.getId(), usuario.getEstado().name(), nombreUsuario(usuario));
    }

    @Transactional
    public MensajeView registrarEmpresa(RegistroEmpresaForm form) {
        validarCorreoDisponible(form.getCorreoElectronico());
        Usuario usuario = crearUsuario(form.getCorreoElectronico(), form.getClave(), Rol.EMPRESA, Estado.PENDIENTE);
        Empresa empresa = new Empresa();
        empresa.setUsuarioId(usuario.getId());
        empresa.setNombreEmpresa(form.getNombreEmpresa());
        empresa.setLocalizacion(form.getLocalizacion());
        empresa.setCorreoElectronico(form.getCorreoElectronico());
        empresa.setTelefono(form.getTelefono());
        empresa.setDescripcion(form.getDescripcion());
        empresaRepository.save(empresa);
        return new MensajeView(true, "Empresa registrada. Debe esperar aprobación del administrador.");
    }

    @Transactional
    public MensajeView registrarOferente(RegistroOferenteForm form) {
        validarCorreoDisponible(form.getCorreoElectronico());
        if (oferenteRepository.existsByIdentificacion(form.getIdentificacion())) {
            throw new ApiException("Ya existe un oferente con esa identificación.");
        }
        Usuario usuario = crearUsuario(form.getCorreoElectronico(), form.getClave(), Rol.OFERENTE, Estado.PENDIENTE);
        Oferente oferente = new Oferente();
        oferente.setUsuarioId(usuario.getId());
        oferente.setIdentificacion(form.getIdentificacion());
        oferente.setNombreOferente(form.getNombreOferente());
        oferente.setPrimerApellido(form.getPrimerApellido());
        oferente.setSegundoApellido(form.getSegundoApellido());
        oferente.setNacionalidad(form.getNacionalidad());
        oferente.setTelefono(form.getTelefono());
        oferente.setLugarResidencia(form.getLugarResidencia());
        oferenteRepository.save(oferente);
        return new MensajeView(true, "Oferente registrado. Debe esperar aprobación del administrador.");
    }

    public List<Map<String, Object>> listarCaracteristicas() {
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Caracteristica caracteristica : caracteristicaRepository.findAllByOrderByCaracteristicaPadreIdAscNombreCaracteristicaAsc()) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", caracteristica.getId());
            item.put("nombre", caracteristica.getNombreCaracteristica());
            item.put("padreId", caracteristica.getCaracteristicaPadreId());
            resultado.add(item);
        }
        return resultado;
    }

    public List<Map<String, Object>> puestosPublicosRecientes() {
        return puestosToMaps(puestoRepository.findTop5ByTipoPublicacionAndActivoTrueOrderByFechaPublicacionDesc(TipoPublicacion.PUBLICO));
    }

    public List<Map<String, Object>> buscarPuestosPublicos(List<Integer> caracteristicas) {
        List<Puesto> puestos = puestoRepository.findByTipoPublicacionAndActivoTrueOrderByFechaPublicacionDesc(TipoPublicacion.PUBLICO);
        if (caracteristicas == null || caracteristicas.isEmpty()) {
            return puestosToMaps(puestos);
        }
        List<Map<String, Object>> filtrados = new ArrayList<>();
        for (Puesto puesto : puestos) {
            List<PuestoCaracteristica> requisitos = puestoCaracteristicaRepository.findById_PuestoId(puesto.getId());
            boolean coincide = false;
            for (PuestoCaracteristica requisito : requisitos) {
                if (caracteristicas.contains(requisito.getId().getCaracteristicaId())) {
                    coincide = true;
                    break;
                }
            }
            if (coincide) {
                filtrados.add(puestoMap(puesto));
            }
        }
        return filtrados;
    }

    public List<Map<String, Object>> puestosEmpresa(Integer empresaId) {
        return puestosToMaps(puestoRepository.findByEmpresaIdOrderByFechaPublicacionDesc(empresaId));
    }

    @Transactional
    public MensajeView publicarPuesto(Integer empresaId, PuestoForm form) {
        empresaRepository.findById(empresaId).orElseThrow(() -> new ApiException("Empresa no encontrada."));
        validarPuestoForm(form);

        Puesto puesto = new Puesto();
        puesto.setEmpresaId(empresaId);
        puesto.setDescripcionGeneral(form.getDescripcionGeneral().trim());
        puesto.setSalario(form.getSalario());
        puesto.setTipoPublicacion(TipoPublicacion.valueOf(normalizarTipo(form.getTipoPublicacion())));
        puesto.setActivo(true);
        puesto.setFechaPublicacion(LocalDateTime.now());

        Puesto guardado = puestoRepository.save(puesto);
        guardarRequisitos(guardado.getId(), form.getRequisitos());
        return new MensajeView(true, "Puesto publicado correctamente.");
    }

    @Transactional
    public MensajeView actualizarPuesto(Integer puestoId, PuestoForm form) {
        Puesto puesto = puestoRepository.findById(puestoId).orElseThrow(() -> new ApiException("Puesto no encontrado."));
        validarPuestoForm(form);
        puesto.setDescripcionGeneral(form.getDescripcionGeneral().trim());
        puesto.setSalario(form.getSalario());
        puesto.setTipoPublicacion(TipoPublicacion.valueOf(normalizarTipo(form.getTipoPublicacion())));
        if (form.getActivo() != null) {
            puesto.setActivo(form.getActivo());
        }
        puestoRepository.save(puesto);
        puestoCaracteristicaRepository.deleteById_PuestoId(puestoId);
        guardarRequisitos(puestoId, form.getRequisitos());
        return new MensajeView(true, "Puesto actualizado correctamente.");
    }

    @Transactional
    public MensajeView actualizarRequisitosPuesto(Integer puestoId, List<RequisitoForm> requisitos) {
        puestoRepository.findById(puestoId).orElseThrow(() -> new ApiException("Puesto no encontrado."));
        validarRequisitos(requisitos);
        puestoCaracteristicaRepository.deleteById_PuestoId(puestoId);
        guardarRequisitos(puestoId, requisitos);
        return new MensajeView(true, "Requisitos del puesto actualizados correctamente.");
    }

    @Transactional
    public MensajeView desactivarPuesto(Integer puestoId) {
        Puesto puesto = puestoRepository.findById(puestoId).orElseThrow(() -> new ApiException("Puesto no encontrado."));
        puesto.setActivo(false);
        puestoRepository.save(puesto);
        return new MensajeView(true, "Puesto desactivado correctamente. Ya no aparecerá en la parte pública.");
    }

    @Transactional
    public MensajeView activarPuesto(Integer puestoId) {
        Puesto puesto = puestoRepository.findById(puestoId).orElseThrow(() -> new ApiException("Puesto no encontrado."));
        puesto.setActivo(true);
        puestoRepository.save(puesto);
        return new MensajeView(true, "Puesto activado correctamente. Si es público, volverá a aparecer en la parte pública.");
    }

    public List<Map<String, Object>> buscarCandidatos(Integer puestoId, Integer minimo) {
        Puesto puesto = puestoRepository.findById(puestoId).orElseThrow(() -> new ApiException("Puesto no encontrado."));
        List<PuestoCaracteristica> requisitos = puestoCaracteristicaRepository.findById_PuestoId(puesto.getId());
        List<Oferente> oferentes = oferenteRepository.findAll();
        List<Map<String, Object>> resultado = new ArrayList<>();
        int gradoMinimo = minimo == null ? 1 : minimo;
        for (Oferente oferente : oferentes) {
            Usuario usuario = usuarioRepository.findById(oferente.getUsuarioId()).orElse(null);
            if (usuario == null || usuario.getEstado() != Estado.APROBADO) {
                continue;
            }
            int porcentaje = calcularCoincidencia(oferente.getUsuarioId(), requisitos);
            if (porcentaje >= gradoMinimo) {
                Map<String, Object> item = oferenteMap(oferente);
                item.put("coincidencia", porcentaje);
                item.put("habilidades", habilidadesOferente(oferente.getUsuarioId()));
                resultado.add(item);
            }
        }
        resultado.sort((a, b) -> Integer.compare((Integer) b.get("coincidencia"), (Integer) a.get("coincidencia")));
        return resultado;
    }

    @Transactional
    public MensajeView actualizarHabilidades(Integer oferenteId, HabilidadesForm form) {
        oferenteRepository.findById(oferenteId).orElseThrow(() -> new ApiException("Oferente no encontrado."));
        oferenteHabilidadRepository.deleteById_OferenteId(oferenteId);
        if (form.getHabilidades() != null) {
            for (RequisitoForm habilidadForm : form.getHabilidades()) {
                OferenteHabilidad habilidad = new OferenteHabilidad();
                habilidad.setId(new OferenteHabilidadId(oferenteId, habilidadForm.getCaracteristicaId()));
                habilidad.setNivel(Math.max(1, Math.min(5, habilidadForm.getNivel())));
                oferenteHabilidadRepository.save(habilidad);
            }
        }
        return new MensajeView(true, "Habilidades actualizadas correctamente.");
    }

    @Transactional
    public MensajeView subirCurriculum(Integer oferenteId, MultipartFile archivo) {
        Oferente oferente = oferenteRepository.findById(oferenteId).orElseThrow(() -> new ApiException("Oferente no encontrado."));
        if (archivo == null || archivo.isEmpty()) {
            throw new ApiException("Debe seleccionar un archivo PDF.");
        }
        String original = archivo.getOriginalFilename() == null ? "" : archivo.getOriginalFilename().toLowerCase();
        if (!original.endsWith(".pdf")) {
            throw new ApiException("El currículo debe estar en formato PDF.");
        }
        try {
            String fileName = "cv_" + oferenteId + ".pdf";
            List<Path> carpetas = resolverCarpetasUpload();
            Path destinoPrincipal = carpetas.get(0).resolve(fileName).normalize();
            Files.createDirectories(destinoPrincipal.getParent());
            Files.copy(archivo.getInputStream(), destinoPrincipal, StandardCopyOption.REPLACE_EXISTING);

            for (int i = 1; i < carpetas.size(); i++) {
                Path espejo = carpetas.get(i).resolve(fileName).normalize();
                if (!espejo.equals(destinoPrincipal)) {
                    Files.createDirectories(espejo.getParent());
                    Files.copy(destinoPrincipal, espejo, StandardCopyOption.REPLACE_EXISTING);
                }
            }

            oferente.setRutaCurriculum("/uploads/cv/" + fileName);
            oferenteRepository.save(oferente);
            return new MensajeView(true, "Currículo subido correctamente.");
        } catch (Exception exception) {
            throw new ApiException("No fue posible subir el currículo.");
        }
    }

    public Map<String, Object> perfilOferente(Integer oferenteId) {
        Oferente oferente = oferenteRepository.findById(oferenteId).orElseThrow(() -> new ApiException("Oferente no encontrado."));
        Map<String, Object> mapa = oferenteMap(oferente);
        mapa.put("habilidades", habilidadesOferente(oferenteId));
        return mapa;
    }

    public List<Map<String, Object>> pendientes(String rolTexto) {
        Rol rol = Rol.valueOf(rolTexto.toUpperCase());
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Usuario usuario : usuarioRepository.findByRolAndEstadoOrderByFechaRegistroDesc(rol, Estado.PENDIENTE)) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", usuario.getId());
            item.put("correo", usuario.getCorreoElectronico());
            item.put("rol", usuario.getRol().name());
            item.put("fechaRegistro", usuario.getFechaRegistro());
            item.put("nombre", nombreUsuario(usuario));
            resultado.add(item);
        }
        return resultado;
    }

    @Transactional
    public MensajeView aprobarUsuario(Integer id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ApiException("Usuario no encontrado."));
        usuario.setEstado(Estado.APROBADO);
        usuarioRepository.save(usuario);
        if (usuario.getRol() == Rol.EMPRESA) {
            return new MensajeView(true, "Empresa aprobada correctamente.");
        }
        if (usuario.getRol() == Rol.OFERENTE) {
            return new MensajeView(true, "Oferente aprobado correctamente.");
        }
        return new MensajeView(true, "Administrador aprobado correctamente.");
    }

    @Transactional
    public MensajeView rechazarUsuario(Integer id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ApiException("Usuario no encontrado."));
        usuario.setEstado(Estado.RECHAZADO);
        usuarioRepository.save(usuario);
        if (usuario.getRol() == Rol.EMPRESA) {
            return new MensajeView(true, "Empresa rechazada correctamente.");
        }
        if (usuario.getRol() == Rol.OFERENTE) {
            return new MensajeView(true, "Oferente rechazado correctamente.");
        }
        return new MensajeView(true, "Usuario rechazado correctamente.");
    }

    @Transactional
    public MensajeView crearCaracteristica(CaracteristicaForm form) {
        if (form == null || form.getNombreCaracteristica() == null || form.getNombreCaracteristica().isBlank()) {
            throw new ApiException("Debe indicar el nombre de la característica.");
        }
        Caracteristica caracteristica = new Caracteristica();
        caracteristica.setNombreCaracteristica(form.getNombreCaracteristica().trim());
        caracteristica.setCaracteristicaPadreId(form.getCaracteristicaPadreId());
        caracteristicaRepository.save(caracteristica);
        return new MensajeView(true, "Característica registrada correctamente.");
    }

    @Transactional
    public MensajeView actualizarCaracteristica(Integer id, CaracteristicaForm form) {
        Caracteristica caracteristica = caracteristicaRepository.findById(id).orElseThrow(() -> new ApiException("Característica no encontrada."));
        if (form == null || form.getNombreCaracteristica() == null || form.getNombreCaracteristica().isBlank()) {
            throw new ApiException("Debe indicar el nombre de la característica.");
        }
        if (form.getCaracteristicaPadreId() != null && form.getCaracteristicaPadreId().equals(id)) {
            throw new ApiException("Una característica no puede ser su propia característica padre.");
        }
        caracteristica.setNombreCaracteristica(form.getNombreCaracteristica().trim());
        caracteristica.setCaracteristicaPadreId(form.getCaracteristicaPadreId());
        caracteristicaRepository.save(caracteristica);
        return new MensajeView(true, "Característica actualizada correctamente.");
    }

    @Transactional
    public MensajeView eliminarCaracteristica(Integer id) {
        Caracteristica caracteristica = caracteristicaRepository.findById(id).orElseThrow(() -> new ApiException("Característica no encontrada."));
        caracteristicaRepository.delete(caracteristica);
        return new MensajeView(true, "Característica eliminada correctamente.");
    }


    private Usuario crearUsuario(String correo, String clave, Rol rol, Estado estado) {
        Usuario usuario = new Usuario();
        usuario.setCorreoElectronico(correo);
        usuario.setClave(passwordEncoder.encode(clave));
        usuario.setRol(rol);
        usuario.setEstado(estado);
        usuario.setFechaRegistro(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    private void validarCorreoDisponible(String correo) {
        if (usuarioRepository.existsByCorreoElectronico(correo)) {
            throw new ApiException("Ya existe un usuario con ese correo electrónico.");
        }
    }

    private String nombreUsuario(Usuario usuario) {
        if (usuario.getRol() == Rol.EMPRESA) {
            Optional<Empresa> empresa = empresaRepository.findById(usuario.getId());
            return empresa.map(Empresa::getNombreEmpresa).orElse(usuario.getCorreoElectronico());
        }
        if (usuario.getRol() == Rol.OFERENTE) {
            Optional<Oferente> oferente = oferenteRepository.findById(usuario.getId());
            return oferente.map(o -> o.getNombreOferente() + " " + o.getPrimerApellido()).orElse(usuario.getCorreoElectronico());
        }
        return "Administrador";
    }

    private List<Map<String, Object>> puestosToMaps(List<Puesto> puestos) {
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Puesto puesto : puestos) {
            resultado.add(puestoMap(puesto));
        }
        return resultado;
    }

    private Map<String, Object> puestoMap(Puesto puesto) {
        Map<String, Object> mapa = new LinkedHashMap<>();
        mapa.put("id", puesto.getId());
        mapa.put("empresaId", puesto.getEmpresaId());
        mapa.put("empresa", empresaRepository.findById(puesto.getEmpresaId()).map(Empresa::getNombreEmpresa).orElse("Empresa"));
        mapa.put("descripcionGeneral", puesto.getDescripcionGeneral());
        mapa.put("salario", puesto.getSalario());
        mapa.put("tipoPublicacion", puesto.getTipoPublicacion().name());
        mapa.put("activo", puesto.getActivo());
        mapa.put("fechaPublicacion", puesto.getFechaPublicacion());
        mapa.put("requisitos", requisitosPuesto(puesto.getId()));
        return mapa;
    }

    private List<Map<String, Object>> requisitosPuesto(Integer puestoId) {
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (PuestoCaracteristica requisito : puestoCaracteristicaRepository.findById_PuestoId(puestoId)) {
            Map<String, Object> item = new LinkedHashMap<>();
            Integer caracteristicaId = requisito.getId().getCaracteristicaId();
            item.put("caracteristicaId", caracteristicaId);
            item.put("nivel", requisito.getNivelDeseado());
            item.put("nombre", caracteristicaRepository.findById(caracteristicaId).map(Caracteristica::getNombreCaracteristica).orElse("Característica"));
            resultado.add(item);
        }
        return resultado;
    }

    private void validarPuestoForm(PuestoForm form) {
        if (form == null) {
            throw new ApiException("Debe completar los datos del puesto.");
        }
        if (form.getDescripcionGeneral() == null || form.getDescripcionGeneral().isBlank()) {
            throw new ApiException("Debe indicar la descripción general del puesto.");
        }
        if (form.getSalario() == null || form.getSalario().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ApiException("Debe indicar un salario válido mayor a cero.");
        }
        validarRequisitos(form.getRequisitos());
    }

    private void validarRequisitos(List<RequisitoForm> requisitos) {
        if (requisitos == null || requisitos.isEmpty()) {
            throw new ApiException("Debe agregar al menos un requisito al puesto.");
        }
        boolean existeValido = false;
        for (RequisitoForm requisito : requisitos) {
            if (requisito != null && requisito.getCaracteristicaId() != null && requisito.getNivel() != null) {
                if (requisito.getNivel() < 1 || requisito.getNivel() > 5) {
                    throw new ApiException("El nivel de cada requisito debe estar entre 1 y 5.");
                }
                existeValido = true;
            }
        }
        if (!existeValido) {
            throw new ApiException("Debe agregar al menos un requisito válido al puesto.");
        }
    }

    private void guardarRequisitos(Integer puestoId, List<RequisitoForm> requisitos) {
        if (requisitos == null) {
            return;
        }
        Map<Integer, Integer> requisitosUnicos = new LinkedHashMap<>();
        for (RequisitoForm requisitoForm : requisitos) {
            if (requisitoForm == null || requisitoForm.getCaracteristicaId() == null || requisitoForm.getNivel() == null) {
                continue;
            }
            int nivel = Math.max(1, Math.min(5, requisitoForm.getNivel()));
            requisitosUnicos.put(requisitoForm.getCaracteristicaId(), nivel);
        }
        for (Map.Entry<Integer, Integer> entry : requisitosUnicos.entrySet()) {
            PuestoCaracteristica requisito = new PuestoCaracteristica();
            requisito.setId(new PuestoCaracteristicaId(puestoId, entry.getKey()));
            requisito.setNivelDeseado(entry.getValue());
            puestoCaracteristicaRepository.save(requisito);
        }
    }

    private Map<String, Object> oferenteMap(Oferente oferente) {
        Map<String, Object> mapa = new LinkedHashMap<>();
        mapa.put("usuarioId", oferente.getUsuarioId());
        mapa.put("identificacion", oferente.getIdentificacion());
        mapa.put("nombre", oferente.getNombreOferente());
        mapa.put("primerApellido", oferente.getPrimerApellido());
        mapa.put("segundoApellido", oferente.getSegundoApellido());
        mapa.put("nacionalidad", oferente.getNacionalidad());
        mapa.put("telefono", oferente.getTelefono());
        mapa.put("lugarResidencia", oferente.getLugarResidencia());
        mapa.put("curriculum", curriculumDisponible(oferente.getRutaCurriculum()));
        return mapa;
    }


    private List<Path> resolverCarpetasUpload() {
        Path userDir = Path.of(System.getProperty("user.dir")).toAbsolutePath().normalize();
        Path backendDir = userDir.getFileName() != null && userDir.getFileName().toString().equalsIgnoreCase("backend")
                ? userDir
                : userDir.resolve("backend").normalize();
        if (!Files.exists(backendDir.resolve("src"))) {
            backendDir = userDir;
        }

        Path carpetaBackend = backendDir.resolve(uploadDir).toAbsolutePath().normalize();
        Path carpetaConfigurada = Path.of(uploadDir).toAbsolutePath().normalize();
        Path carpetaRecursos = backendDir.resolve("src/main/resources/static/uploads/cv").toAbsolutePath().normalize();

        List<Path> carpetas = new ArrayList<>();
        carpetas.add(carpetaBackend);
        if (!carpetas.contains(carpetaConfigurada)) {
            carpetas.add(carpetaConfigurada);
        }
        if (!carpetas.contains(carpetaRecursos)) {
            carpetas.add(carpetaRecursos);
        }
        return carpetas;
    }

    private String curriculumDisponible(String rutaCurriculum) {
        if (rutaCurriculum == null || rutaCurriculum.isBlank()) {
            return null;
        }
        String nombreArchivo = rutaCurriculum.substring(rutaCurriculum.lastIndexOf('/') + 1);
        List<Path> carpetas = resolverCarpetasUpload();
        for (Path carpeta : carpetas) {
            Path archivo = carpeta.resolve(nombreArchivo).normalize();
            if (archivo.startsWith(carpeta) && Files.exists(archivo) && Files.isRegularFile(archivo)) {
                return "/uploads/cv/" + nombreArchivo;
            }
        }
        return null;
    }

    private List<Map<String, Object>> habilidadesOferente(Integer oferenteId) {
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (OferenteHabilidad habilidad : oferenteHabilidadRepository.findById_OferenteId(oferenteId)) {
            Integer caracteristicaId = habilidad.getId().getCaracteristicaId();
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("caracteristicaId", caracteristicaId);
            item.put("nivel", habilidad.getNivel());
            item.put("nombre", caracteristicaRepository.findById(caracteristicaId).map(Caracteristica::getNombreCaracteristica).orElse("Característica"));
            resultado.add(item);
        }
        return resultado;
    }

    private int calcularCoincidencia(Integer oferenteId, List<PuestoCaracteristica> requisitos) {
        if (requisitos == null || requisitos.isEmpty()) {
            return 100;
        }
        Map<Integer, Integer> habilidades = new HashMap<>();
        for (OferenteHabilidad habilidad : oferenteHabilidadRepository.findById_OferenteId(oferenteId)) {
            habilidades.put(habilidad.getId().getCaracteristicaId(), habilidad.getNivel());
        }
        double puntos = 0;
        for (PuestoCaracteristica requisito : requisitos) {
            Integer nivelTiene = habilidades.get(requisito.getId().getCaracteristicaId());
            if (nivelTiene != null) {
                double proporcion = Math.min(1.0, nivelTiene.doubleValue() / requisito.getNivelDeseado().doubleValue());
                puntos += proporcion;
            }
        }
        return (int) Math.round((puntos / requisitos.size()) * 100.0);
    }

    private String normalizarTipo(String tipo) {
        if (tipo == null || tipo.isBlank()) {
            return "PUBLICO";
        }
        return tipo.trim().toUpperCase();
    }
}
